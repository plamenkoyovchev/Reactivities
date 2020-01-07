using Persistence;

namespace Application
{
    public abstract class HandlerBase
    {
        protected DataContext Context { get; }

        public HandlerBase(DataContext context)
        {
            this.Context = context;
        }
    }
}