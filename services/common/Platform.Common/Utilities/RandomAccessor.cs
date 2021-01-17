using System;
using System.Threading;

namespace Platform.Common.Utilities
{
	internal class RandomAccessor : IRandomAccessor
	{
		private readonly Random _random;

		public RandomAccessor()
		{
			_random = new Random(unchecked(Environment.TickCount * 31 + Thread.CurrentThread.ManagedThreadId));
		}

		public Random Random => _random;
	}
}
