using System;
using System.Net;

namespace Application.Common.Exceptions
{
    public class RestException : Exception
    {
        public RestException(HttpStatusCode statusCode)
        {
            StatusCode = statusCode;
        }

        public RestException(HttpStatusCode statusCode, object errors)
        : this(statusCode)
        {
            Errors = errors;
        }

        public HttpStatusCode StatusCode { get; }
        public object Errors { get; }
    }
}