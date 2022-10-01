class Cache
{

	#cache = {
		testMovie:
			{
				data: null, 
				timeStamp: null 
			}
	};


	searchCache(key)
	{
		return this.#cache[key] || false;
	}

	addToCache(key, data)
	{
		this.#cache[key] = data;
	}
}

module.exports = Cache;