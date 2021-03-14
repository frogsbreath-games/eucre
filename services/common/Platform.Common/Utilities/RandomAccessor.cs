using System;
using System.Threading;

namespace Platform.Common.Utilities
{
	internal class RandomAccessor : IRandomAccessor
	{
		public RandomAccessor()
		{
			Random = new Random(unchecked((Environment.TickCount * 31) + Thread.CurrentThread.ManagedThreadId));
		}

		public Random Random { get; }
	}
}
