let myurl = "https://api.giphy.com/v1/gifs/search?api_key=WwsgCrQ5yiVA2nbU5xAuyFMhZWV5rG76&q="
	let url = ""
	let form = document.querySelector("#myForm")
	let cardcontainer = document.querySelector("#resultscontainer")
	let error = document.querySelector("#error")

	function createComponent(titolo,autore,gif,data,link,embed){
		let div = document.createElement("div")
		let oklink = `https://media.giphy.com/media/${link}/giphy.gif`
		div.innerHTML = `
		<div class="cardbox"  style="background-image: url(${gif});background-size: cover;background-position: center">
				<div class="content">
					<div class="information">
						<div>
							<h2 class="font-milan white fsize20px marginbot5px">${titolo}</h2>
							<h3 class="font-milan white fsize16px marginbot5px">uploaded by <span class="font-milan white fsize16px">${autore}</span></h3>
							<p class="font-milan white fsize12px">on <span class="font-milan white fsize12px">${data}</span></p>
						</div>
						<div>
							<img class="maright-30px link" alt="${oklink}" src="./images/link.svg">
							<a href="${embed}" target="_blank"><img src="./images/embed.svg"></a>
						</div>
					</div>
				</div>
			</div>`
			cardcontainer.append(div)
	}

	function clearContainer(){
		cardcontainer.innerHTML = ""
	}


	form.addEventListener("submit", function(e){
		e.preventDefault()
		clearContainer()
		let userinput = document.querySelector("input[name=search]").value

		url = myurl + userinput
		let prom = fetch(url)

		prom.then(
			response => response.json()
			).then(
				data =>	{
					if(data.data.length === 0){
						let div = document.createElement("div")
						div.innerHTML = `
						<div>
							<p id="error" class="font-milan fsize20px">Nessun risultato</p>
						</div>
						`
						cardcontainer.append(div)
					}else{
						for(let i = 0; i<data.data.length;i++){
						createComponent(data.data[i].title, data.data[i].username, data.data[i].images.downsized.url, data.data[i].import_datetime,data.data[i].id,data.data[i].embed_url);
					}
					}
				}
				
			).catch(
				error => error.info(error)
			)

	})

	document.addEventListener("click",function(e){
		if(e.target.classList.contains("link")){
			let clink = e.target.alt
			console.log(clink)
			navigator.clipboard.writeText(clink).then(() => {
            alert("Copied to clipboard");
        });
		}
	})