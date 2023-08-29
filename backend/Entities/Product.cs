using JsonApiDotNetCore.Resources;
using JsonApiDotNetCore.Resources.Annotations;

namespace backend.Entities
{
    [Resource]
    public class Product : Identifiable<int>
    {
        [Attr]
        public string Name { get; set; }
        [Attr]
        public string? Description { get; set; }
        [HasOne]
        public Category Category { get; set; }
        [Attr]
        public double Price { get; set; }
        [Attr]
        public string Picture { get; set; }
    }
}
