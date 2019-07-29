 using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class OrdenController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Orden
        public System.Object GetOrden()
        {
            var result = (from a in db.Orden
                          join b in db.Cliente on a.ClienteId equals b.Id
                          select new
                          {
                              a.Id,
                              a.NoOrder,
                              Cliente = b.Nombre,
                              a.MetPago,
                              a.PrecioTotal
                          }).ToList();
            return result;
        }

        // GET: api/Orden/5
        [ResponseType(typeof(Orden))]
        public IHttpActionResult GetOrden(int id)
        {
            var orden = (from a in db.Orden
                         where a.Id == id
                         select new
                         {
                             a.Id,
                             a.NoOrder,
                             a.ClienteId,
                             a.MetPago,
                             a.PrecioTotal,
                             DeletedOrdenItemIds = ""
                         }).FirstOrDefault();
            var ordenDetalles = (from a in db.OrdenItem
                                 join b in db.Item on a.ItemId equals b.Id
                                 where a.OrdenId == id
                                 select new
                                 {
                                     a.OrdenId,
                                     a.OrdenItemId,
                                     a.ItemId,
                                     NombreItem = b.Nombre,
                                     b.Precio,
                                     a.Cantidad,
                                     Total = a.Cantidad * b.Precio
                                 }).ToList();

            return Ok(new { orden, ordenDetalles});
        }

        // PUT: api/Orden/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrden(int id, Orden orden)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != orden.Id)
            {
                return BadRequest();
            }

            db.Entry(orden).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrdenExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Orden
        [ResponseType(typeof(Orden))]
        public IHttpActionResult PostOrden(Orden orden)
        {
            try
            {

                //Orden Tabla
                if (orden.Id == 0)
                    db.Orden.Add(orden);
                //Tabla item 
                else
                    db.Entry(orden).State = EntityState.Modified;
                foreach (var item in orden.OrdenItem)
                {
                    if(item.OrdenItemId == 0)
                        db.OrdenItem.Add(item);
                    else
                        db.Entry(item).State = EntityState.Modified;
                }
                //Delete for ordenItems
                foreach (var id in orden.DeletedOrdenItemIds.Split(',').Where(x=> x != ""))
                {
                    OrdenItem x = db.OrdenItem.Find(Convert.ToInt64(id));
                    db.OrdenItem.Remove(x); 
                }
                db.SaveChanges();
                //return CreatedAtRoute("DefaultApi", new { id = orden.Id }, orden);
                return Ok();
            }
            catch (Exception e)
            {

                throw e;
            }

          
        }

        // DELETE: api/Orden/5
        [ResponseType(typeof(Orden))]
        public IHttpActionResult DeleteOrden(int id)
        {
            Orden orden = db.Orden.Find(id);
            if (orden == null)
            {
                return NotFound();
            }

            db.Orden.Remove(orden);
            db.SaveChanges();

            return Ok(orden);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrdenExists(int id)
        {
            return db.Orden.Count(e => e.Id == id) > 0;
        }
    }
}