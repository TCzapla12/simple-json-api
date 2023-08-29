using JsonApiDotNetCore.Resources;
using JsonApiDotNetCore.Resources.Annotations;

namespace backend.Entities
{
    [Resource]
    public class Category: Identifiable<int>
    {
        [Attr]
        public string Name { get; set; }   
    }
}