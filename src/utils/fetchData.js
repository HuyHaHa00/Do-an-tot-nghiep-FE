export const exerciseOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
		'X-RapidAPI-Key': 'cbedd86dd2msh9c0747b5ea801a9p15f331jsn21ce8519305c',
	}
};

export const youtubeOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
		'X-RapidAPI-Key': 'cbedd86dd2msh9c0747b5ea801a9p15f331jsn21ce8519305c',
	}
};

export const fetchData = async (url, option) => {
    const response = await fetch(url, option);
    const data = await response.json();
    return data;
    }

//key1: "cbedd86dd2msh9c0747b5ea801a9p15f331jsn21ce8519305c" acc nqhuyaltt
//alternate key1: "aeba99ad1bmshd5f1685aadb4812p19fcc0jsnf610c2711674" acc hou
//alternate key2: "37c0d12acemsh457d729717b02bap11f208jsnbd7fc819e3e1" acc huynq201100
//alternate key3: "3ac67409ccmsh20b1efe1f28f5aep1ea628jsn7b9a64fd8819" acc boyml24
