
export const exerciseOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cbedd86dd2msh9c0747b5ea801a9p15f331jsn21ce8519305c',
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
	}
};

export const fetchData = async (url, option) => {
    const response = await fetch(url, option);
    const data = await response.json();
    return data;
    }