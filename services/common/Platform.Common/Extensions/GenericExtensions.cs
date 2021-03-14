
namespace Platform.Common.Extensions
{
	public static class GenericExtensions
	{
		public static void AsVoid<T>(this T obj) { }

		public static object? AsArray<T1, T2>(this (T1, T2) tuple)
		{
			return new object?[2]
			{
				tuple.Item1,
				tuple.Item2
			};
		}

		public static (T1, T2) CombineWith<T1, T2>(this T1 item1, T2 item2)
			=> (item1, item2);

		public static (T1, T2, T3) AndWith<T1, T2, T3>(this (T1, T2) tuple, T3 item3)
			=> (tuple.Item1, tuple.Item2, item3);

		public static (T1, T2, T3) CombineWithTuple<T1, T2, T3>(this T1 item1, (T2, T3) tuple)
			=> (item1, tuple.Item1, tuple.Item2);

		public static (T1, T2, T3, T4) AndWithTuple<T1, T2, T3, T4>(this (T1, T2) tuple1, (T3, T4) tuple2)
			=> (tuple1.Item1, tuple1.Item2, tuple2.Item1, tuple2.Item2);
	}
}
