﻿using System;
using System.Linq;
using Platform.Common.Utilities;
using WordGame.API.Application.Resources;

namespace WordGame.API.Application.Services
{
	public interface INameGenerator
	{
		string GetRandomName();
	}

	public class NameGenerator : INameGenerator
	{
		protected readonly IRandomAccessor _rand;

		public NameGenerator(IRandomAccessor rand)
		{
			_rand = rand ?? throw new ArgumentNullException(nameof(rand));
		}

		public string GetRandomName()
		{
			var adjective = AdjectiveList.Adjectives[_rand.Random.Next(0, AdjectiveList.Adjectives.Length)];
			var animal = AnimalList.Animals[_rand.Random.Next(0, AnimalList.Animals.Length)];

			return $"{adjective[0].ToString().ToUpper()}{adjective[1..]} {animal}";
		}
	}
}
