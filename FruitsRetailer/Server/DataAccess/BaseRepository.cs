using FruitsRetailer.Server.Model;
using FruitsRetailer.Server.Util;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace FruitsRetailer.Server.DataAccess
{
    abstract public class BaseRepository<TContext>
        where TContext : DbContext, new()
    {
        protected DbContext _BaseDataContext;
        public BaseRepository()
        {
            _BaseDataContext = new TContext();
            _BaseDataContext.Database.Connection.ConnectionString = FruitsHelper.DatabaseConnectionString;
            _BaseDataContext.Configuration.ProxyCreationEnabled = false;
            _BaseDataContext.Configuration.LazyLoadingEnabled = false;
        }


        public int SaveEntity(IEntity entity)
        {
            _BaseDataContext.Entry(entity).State = entity.Id > 0 ? EntityState.Modified : EntityState.Added;
            _BaseDataContext.SaveChanges();
            return entity.Id;

        }
        public void SaveInContext(IEntity entity)
        {
            _BaseDataContext.Entry(entity).State = entity.Id > 0 ? EntityState.Modified : EntityState.Added;
        }

        public T GetById<T>(int id) where T : class
        {
            return _BaseDataContext.Set<T>().Find(id);

        }

        public void DeleteEntity(IEntity entity, bool isSave = true)
        {
            _BaseDataContext.Entry(entity).State = EntityState.Deleted;
            if (isSave)
                _BaseDataContext.SaveChanges();
        }
    }
}