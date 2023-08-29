using JsonApiDotNetCore.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddJsonApi<ApplicationDbContext>(options => options.IncludeTotalResourceCount = true);

            services.AddControllers();

            services.AddSwaggerGen(options => { options.SwaggerDoc("v1", new OpenApiInfo { Title = "backend", Version = "v1" }); });

            services.AddCors(options =>
            {
                var frontendURL = Configuration.GetValue<string>("frontend_url");
            });
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(options => options.SwaggerEndpoint("/swagger/v1/swagger.json", "backend v1"));
            }
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseJsonApi();

            app.UseCors();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}
