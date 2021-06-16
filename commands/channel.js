const reader = require("g-sheets-api");
const fetch = require("node-fetch");
module.exports = {
	name: 'testup',
	description: '494',
	async execute(message) {
        // const readerOptions = {
        //     sheetId: "1innwKbd8HFpXSF3FVH90NiIG5nCACNHf587Vxw1bN3E",
        //     returnAllResults: true
        //   };


        //   https://api.npoint.io/38a2899b98818d89418c

            await fetch("https://api.npoint.io/38a2899b98818d89418c")
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                console.log("dedededede")
                data.map(region => {
                    console.log(region)
                    console.log(region.hasOwnProperty("fight"))
                    if(region.hasOwnProperty("fight")) {
                        console.log(region)
                    }
                })

            }).catch(err => {
                // Do something for an error here
            });
          
        //   reader(readerOptions, (results) => {
              
        //       results.map(result => {

        //         console.log(result)
        //         console.log(result['Pseudo GDA'])
        //       })
            
		//         // message.reply(results)   
        //   }); 
    },
};