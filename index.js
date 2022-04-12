var axios = require("axios")

async function text2img(text) {
	try {
		var a = await axios.request("https://text2image.com/", {
			method: "GET",
			headers: {
				"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; Flow) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/359.0.0.288 Safari/537.36"
			}
		})

		var cookie = a.headers["set-cookie"][0].split(";")[0]

		var data = {
			"action": "genImage",
			"text": text,
			"font": "comic",
			"fontSize": "20",
			"width": "200",
			"height": "200",
			"forecolor": "#FCFF02",
			"backcolor": "#GGGGGG",
			"valign": "centre",
			"format": "3",
			"token": require("cheerio").load(a.data)("input[name='token']").attr("value")
		}

		var b = await axios.request("https://text2image.com/api.php", {
			method: "POST",
			data: JSON.stringify(data),
			headers: {
				"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; Flow) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/359.0.0.288 Safari/537.36",
				cookie: cookie
			}
		})

		return ({
			url: "https://text2image.com" + b.data.image,
			data: b.data
		})
	} catch (e) {
		if (e.response) {
			return ({
				status: "gagal",
				data: e.response.data
			})
		} else {
			return e
		}
	}
}

async function text2imgr(text) {
	try {
		var a = await axios.request("https://text2image.com/", {
			method: "GET",
			headers: {
				"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; Flow) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/359.0.0.288 Safari/537.36"
			}
		})

		var cookie = a.headers["set-cookie"][0].split(";")[0]
		var rand = ["FCFF02", "DAFF09", "B6FF00", "90FF06", "6DFF0B", "12FF0D", "18FF60", "1CFFBF", "0AFFF8", "0FC7FF", "0764FF", "051FFF", "3F06FF", "9609FF", "DF08FF", "FF0DF4", "FF08A5", "FF0A69", "FF0C16", "FF4B0F", "FF7E01", "FFB902", "FFF305"]
		var data = {
			"action": "genImage",
			"text": text,
			"font": "comic",
			"fontSize": "20",
			"width": "200",
			"height": "200",
			"forecolor": `#${rand[Math.floor(Math.random() * rand.length)]}`,
			"backcolor": "#GGGGGG",
			"valign": "centre",
			"format": "3",
			"token": require("cheerio").load(a.data)("input[name='token']").attr("value")
		}

		var b = await axios.request("https://text2image.com/api.php", {
			method: "POST",
			data: JSON.stringify(data),
			headers: {
				"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; Flow) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/359.0.0.288 Safari/537.36",
				cookie: cookie
			}
		})

		return ({
			url: "https://text2image.com" + b.data.image,
			data: b.data
		})
	} catch (e) {
		if (e.response) {
			return ({
				status: "gagal",
				data: e.response.data
			})
		} else {
			return e
		}
	}
}

module.exports = {
	text2img,
	text2imgr
}
