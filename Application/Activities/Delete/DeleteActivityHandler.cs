using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using MediatR;
using Persistence;

namespace Application.Activities.Delete
{
    public class DeleteActivityHandler : HandlerBase, IRequestHandler<DeleteActivityCommand>
    {
        public DeleteActivityHandler(DataContext context) : base(context)
        {
        }

        public async Task<Unit> Handle(DeleteActivityCommand request, CancellationToken cancellationToken)
        {
            var activity = await this.Context.Activities.FindAsync(request.Id);
            if (activity == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new
                {
                    activity = "Not found"
                });
            }

            this.Context.Remove(activity);
            await this.Context.SaveChangesAsync();

            return Unit.Value;
        }
    }
}