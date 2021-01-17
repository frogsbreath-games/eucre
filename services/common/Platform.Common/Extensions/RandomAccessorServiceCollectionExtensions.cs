using Microsoft.Extensions.DependencyInjection;
using Platform.Common.Utilities;

namespace Platform.Common.Extensions
{
	public static class RandomAccessorServiceCollectionExtensions
	{
		public static IServiceCollection AddRandomAccessor(this IServiceCollection services)
		{
			return services.AddScoped<IRandomAccessor, RandomAccessor>();
		}
	}
}
