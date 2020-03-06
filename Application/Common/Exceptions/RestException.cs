using System;
using System.Net;

namespace Application.Common.Exceptions
{
    public class RestException : Exception
    {
        public RestException(HttpStatusCode statusCode, object errors)
        {
            StatusCode = statusCode;
            Errors = errors;
        }

        public HttpStatusCode StatusCode { get; }
        public object Errors { get; }
    }
}