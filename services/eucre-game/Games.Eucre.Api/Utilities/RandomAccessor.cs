using System;
using System.Threading;

namespace Games.Eucre.Api.Utilities
{
	public class RandomAccessor
	{
		private readonly Random _random;

		public RandomAccessor()
		{
			_random = new Random(unchecked(Environment.TickCount * 31 + Thread.CurrentThread.ManagedThreadId));
		}

		public Random Random => _random;
	}
}
