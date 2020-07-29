const baseUrl = '';

export default function(url, options = {}, base = baseUrl) {
    return fetch(base + url, options).then(res=>{
        if (res.status !== 200) {
            return res.text().then(function(text){
                throw new Error(text);
            });
        }

        return res.json();
    });
}