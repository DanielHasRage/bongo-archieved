// variables \\
const Discord = require('discord.js');
const FS = require('fs');
const Client = new Discord.Client();
const Configuration = require('./config.json');

// client on-ready \\
Client.on('ready', () => {
    console.log("Connected as " + Client.user.tag + '\n------------------------------------')
    Client.user.setActivity('+help', { type: 'LISTENING' });
});

// command-handler \\
Client.on('message', message => {
    if (!message.content.startsWith(Configuration['global-prefix']) || message.author.bot) return;
    const Arguments = message.content.slice(Configuration['global-prefix'].length).trim().split(/ +/);
    const Command = Arguments.shift().toLowerCase();
    if (Command === "joineconomy"){
        FS.readFile('./economy.json', (err, data) => {
            if (err) {
                console.log(err)
            }
            const userID = message.author.id.toString()
            if(!data.includes(userID)){
                
                const SuccessEmbed = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle('Success!')
                    .setDescription('You have successfully joined the economy system!')
                    .setTimestamp()
                    .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');

                FS.readFile('./economy.json', 'utf8', function readFileCallback(err, data){
                    if (err){
                        console.log(err);
                    } else {
                    obj = JSON.parse(data);
                    obj.table.push({userID: userID, bCoins: 50});
                    json = JSON.stringify(obj);
                    FS.writeFile('./economy.json', json, 'utf8', (err) => {
                        if(err){console.log(err)};
                    })
                }});

                message.channel.send(SuccessEmbed);
            }else{
                const FailedEmbed = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Failure!')
                    .setDescription('You are already in the economy system!')
                    .setTimestamp()
                    .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                message.channel.send(FailedEmbed);
            }
        })
    }
    if (Command === "balance"){
        FS.readFile('./economy.json', (err, data) => {
            if (err) {
                console.log(err)
            }
            const Data = JSON.parse(data);
            const userID = message.author.id.toString()
            if (data.includes(userID)){
                for(key in Data.table){
                    if(Data.table[key].userID === userID){
                        const Value = Data.table[key].bCoins
                        const SuccessEmbed = new Discord.MessageEmbed()
                            .setColor('#00ff00')
                            .setTitle('Balance!')
                            .setDescription(message.author.username + ', you have **' + Value + '** Bongo Coins!')
                            .setTimestamp()
                            .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                        message.channel.send(SuccessEmbed);
                    }
                }
            }else{
                const FailedEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Failure!')
                .setDescription('You are not in the economy system!')
                .setTimestamp()
                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
            message.channel.send(FailedEmbed); 
            }
        })
    }
    if (Command === "help") {
        const HelpEmbed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle('Help Menu')
            .setDescription('This is the help menu, here you can see a list of Bongos amazing commands! If you are looking for help with Bongos moderation and/or are a staff member, run the command (+staffhelp).')
            .addFields(
                { name: 'Join Economy (+joineconomy)', value: 'This command puts you into Bongos economy system.', inline: true },
                { name: 'Balance (+balance)', value: 'This command checks your balance within Bongos economy system.', inline: true },
                { name: 'Work (+work)', value: 'This command allows you to work for money to raise your balance in Bongos economy system.', inline: true },
                { name: 'Check Rank (+checkrank)', value: 'This command shows your current rank, which can be bought!', inline: true },
                { name: 'Check Pet (+checkpet)', value: 'This command shows your current pet, which can be bought!', inline: true },
                { name: 'Adoption Shop (+ashop)', value: 'This command shows the adoption shop, where you can buy Bongo pets!', inline: true },
                { name: 'Rank Shop (+rshop)', value: 'This command shows the rank shop, where you can buy ranks!', inline: true },
                { name: 'aBuy (+abuy)', value: 'This command lets you buy a pet from the adoption shop using a pet ID! (NOTICE: BUYING A PET REPLACES ANY OLD PETS!)', inline: true },
                { name: 'rBuy (+rbuy)', value: 'This command lets you buy a rank from the rank shop using a rank ID! (NOTICE: BUYING A RANK REPLACES ANY OLD RANKS!)', inline: true },
                { name: 'aView (+aview)', value: 'This command lets you view a pet from the adoption shop using a pet ID! (NOTICE: BUYING A PET REPLACES ANY OLD PETS!)', inline: true },
            )
            .setTimestamp()
            .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
        message.channel.send(HelpEmbed);
    }
    if (Command === "staffhelp") {
        const HelpEmbed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle('Staff Help Menu')
            .setDescription('This is the help menu for moderation and staff modules. Below is a list of useable commands.')
            .addFields(
                { name: 'Warn (+warn[mention])', value: 'This command allows you to warn a user.', inline: true },
            )
            .setTimestamp()
            .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
        message.channel.send(HelpEmbed);
    }
    if (Command === "work") {
        FS.readFile('./economy.json', (err, data) => {
            if (err) {
                console.log(err)
            }
            const Data = JSON.parse(data);
            var userID = message.author.id.toString()
            if (data.includes(userID)){
                const RStrings = [" worked in the mines ", " did some banking for a credit union ", " worked at a fast food place "]
                var RStringsFinal = Math.floor(Math.random() * RStrings.length);
                const SelectedString = RStrings[RStringsFinal]
                for(key in Data.table){
                    if(Data.table[key].userID === userID){
                        const N = Math.floor(Math.random()*200)
                        FS.readFile('./economy.json', 'utf8', function readFileCallback(err, data){
                            if (err){
                                console.log(err);
                            } else {
                            obj = JSON.parse(data);
                            function changeCoins() {
                                for (var i in obj.table) {
                                    if (obj.table[i].userID === userID) {
                                        var old = obj.table[i].bCoins
                                        var ne = old + N
                                        obj.table[i].bCoins = obj.table[i].bCoins + N;
                                        const SuccessEmbed = new Discord.MessageEmbed()
                                            .setColor('#00ff00')
                                            .setTitle('Work!')
                                            .setDescription(message.author.username + SelectedString + 'and earned **' + N + '** Bongo Coins!\nOld Balance: **' + old + '** Bongo Coins\nNew Balance: **' + ne + '** Bongo Coins')
                                            .setTimestamp()
                                            .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                                        message.channel.send(SuccessEmbed);
                                        break;
                                    }
                                }
                            }
                            changeCoins()
                            json = JSON.stringify(obj);
                            FS.writeFile('./economy.json', json, 'utf8', (err) => {
                                if(err){console.log(err)};
                            })
                        }});
                    }
                }
            }else{
                const FailedEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Failure!')
                .setDescription('You are not in the economy system!')
                .setTimestamp()
                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
            message.channel.send(FailedEmbed); 
            }
        })
    }
    if (Command === "checkrank") {
        FS.readFile('./ranks.json', (err, data) => {
            if (err) {
                console.log(err)
            }
            const Data = JSON.parse(data);
            var userID = message.author.id.toString()
            if (data.includes(userID)){
                for (var i in Data.table) {
                    if (Data.table[i].userID === userID) {
                        const SuccessEmbed = new Discord.MessageEmbed()
                            .setColor('#00ff00')
                            .setTitle('Rank!')
                            .setDescription(message.author.username + ', your current rank is **' + Data.table[i].rank + '**.')
                            .setTimestamp()
                            .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                        message.channel.send(SuccessEmbed);
                        break;
                    }
                }
        }else{
            const FailedEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Failure!')
                .setDescription('You are not assigned to a rank!')
                .setTimestamp()
                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
            message.channel.send(FailedEmbed);
        }
    });
    }
    if (Command === "checkpet") {
        FS.readFile('./pets.json', (err, data) => {
            if (err) {
                console.log(err)
            }
            const Data = JSON.parse(data);
            var userID = message.author.id.toString()
            if (data.includes(userID)){
                for (var i in Data.table) {
                    if (Data.table[i].userID === userID) {
                        if (Data.table[i].pet === "Bobgo") {
                            const SuccessEmbed = new Discord.MessageEmbed()
                                .setColor('#00ff00')
                                .setTitle('Pets!')
                                .setDescription(message.author.username + ', you currently own **' + Data.table[i].pet + '**.')
                                .attachFiles('./petImages/bobgo.png')
                                .setThumbnail('attachment://bobgo.png')
                                .setTimestamp()
                                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                            message.channel.send(SuccessEmbed);
                            break;
                        }
                        if (Data.table[i].pet === "Evil Bobgo") {
                            const SuccessEmbed = new Discord.MessageEmbed()
                                .setColor('#00ff00')
                                .setTitle('Pets!')
                                .setDescription(message.author.username + ', you currently own **' + Data.table[i].pet + '**.')
                                .attachFiles('./petImages/evilbobgo.png')
                                .setThumbnail('attachment://evilbobgo.png')
                                .setTimestamp()
                                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                            message.channel.send(SuccessEmbed);
                            break;
                        }
                        if (Data.table[i].pet === "Yellow Bobgo") {
                            const SuccessEmbed = new Discord.MessageEmbed()
                                .setColor('#00ff00')
                                .setTitle('Pets!')
                                .setDescription(message.author.username + ', you currently own **' + Data.table[i].pet + '**.')
                                .attachFiles('./petImages/yellowbobgo.png')
                                .setThumbnail('attachment://yellowbobgo.png')
                                .setTimestamp()
                                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                            message.channel.send(SuccessEmbed);
                            break;
                        }
                        if (Data.table[i].pet === "Blue Bobgo") {
                            const SuccessEmbed = new Discord.MessageEmbed()
                                .setColor('#00ff00')
                                .setTitle('Pets!')
                                .setDescription(message.author.username + ', you currently own **' + Data.table[i].pet + '**.')
                                .attachFiles('./petImages/bluebobgo.png')
                                .setThumbnail('attachment://bluebobgo.png')
                                .setTimestamp()
                                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                            message.channel.send(SuccessEmbed);
                            break;
                        }
                        if (Data.table[i].pet === "Queen Bobgo") {
                            const SuccessEmbed = new Discord.MessageEmbed()
                                .setColor('#00ff00')
                                .setTitle('Pets!')
                                .setDescription(message.author.username + ', you currently own **' + Data.table[i].pet + '**.')
                                .attachFiles('./petImages/queenbobgo.png')
                                .setThumbnail('attachment://queenbobgo.png')
                                .setTimestamp()
                                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                            message.channel.send(SuccessEmbed);
                            break;
                        }
                    }
                }
        }else{
            const FailedEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Failure!')
                .setDescription('You do not own a pet!')
                .setTimestamp()
                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
            message.channel.send(FailedEmbed);
        }
    });
    }
    if (Command === "ashop") {
        FS.readFile('./pets.json', (err, data) => {
            if (err) {
                console.log(err)
            }
            const Data = JSON.parse(data);
            var userID = message.author.id.toString()
            const SuccessEmbed = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Adoption Shop!')
                .setDescription('Type +abuy[pet id] to purchase a pet. You can also do (+aview[pet id]) to view before buying.')
                .addFields(
                    { name: 'Bobgo', value: 'ID: 1 [COST: 5000]', inline: true },
                    { name: 'Evil Bobgo', value: 'ID: 2 [COST: 10000]', inline: true },
                    { name: 'Yellow Bobgo', value: 'ID: 3 [COST: 15000]', inline: true },
                    { name: 'Blue Bobgo', value: 'ID: 4 [COST: 15000]', inline: true },
                    { name: 'Queen Bobgo', value: 'ID: 5 [COST: 50000]', inline: true },
                )
                .setTimestamp()
                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
            message.channel.send(SuccessEmbed);
        })
    }
    if (Command === "aview"){
        if (Arguments[0] === '1'){
            const SuccessEmbed = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle('View!')
                .setDescription('You are viewing the pet **Bobgo**!')
                .attachFiles('./petImages/bobgo.png')
                .setThumbnail('attachment://bobgo.png')
                .addFields(
                    { name: "What now?", value: 'You can now use +abuy to buy this pet if you would like!', inline: true },
                )
                .setTimestamp()
                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
            message.channel.send(SuccessEmbed);
        }
        if (Arguments[0] === '2'){
            const SuccessEmbed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle('View!')
            .setDescription('You are viewing the pet **Evil Bobgo**!')
            .attachFiles('./petImages/evilbobgo.png')
            .setThumbnail('attachment://evilbobgo.png')
            .addFields(
                { name: "What now?", value: 'You can now use +abuy to buy this pet if you would like!', inline: true },
            )
            .setTimestamp()
            .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
        message.channel.send(SuccessEmbed);
        }
        if (Arguments[0] === '3'){
            const SuccessEmbed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle('View!')
            .setDescription('You are viewing the pet **Yellow Bobgo**!')
            .attachFiles('./petImages/yellowbobgo.png')
            .setThumbnail('attachment://yellowbobgo.png')
            .addFields(
                { name: "What now?", value: 'You can now use +abuy to buy this pet if you would like!', inline: true },
            )
            .setTimestamp()
            .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
        message.channel.send(SuccessEmbed);
        }
        if (Arguments[0] === '4'){
            const SuccessEmbed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle('View!')
            .setDescription('You are viewing the pet **Blue Bobgo**!')
            .attachFiles('./petImages/bluebobgo.png')
            .setThumbnail('attachment://bluebobgo.png')
            .addFields(
                { name: "What now?", value: 'You can now use +abuy to buy this pet if you would like!', inline: true },
            )
            .setTimestamp()
            .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
        message.channel.send(SuccessEmbed);
        }
        if (Arguments[0] === '5'){
            const SuccessEmbed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle('View!')
            .setDescription('You are viewing the pet **Queen Bobgo**!')
            .attachFiles('./petImages/queenbobgo.png')
            .setThumbnail('attachment://queenbobgo.png')
            .addFields(
                { name: "What now?", value: 'You can now use +abuy to buy this pet if you would like!', inline: true },
            )
            .setTimestamp()
            .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
        message.channel.send(SuccessEmbed);
        }
    }
    if (Command === "abuy"){
        function setPet( pet ){
            FS.readFile('./pets.json', (err, data) => {
                if (err) {
                    console.log(err)
                }
                const Data = JSON.parse(data);
                var userID = message.author.id.toString()
                if (data.includes(userID)){
                    for (var i in Data.table) {
                        if (Data.table[i].userID === userID) {
                            Data.table[i].pet = pet;
                            break;
                        }
                    }
                    json = JSON.stringify(Data)
                    FS.writeFile('./pets.json', json, 'utf8', (err) => {
                        if(err){console.log(err)};
                    })
                    const SuccessEmbed = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle('Success!')
                        .setDescription('You have purchased the pet **' + pet + '**!')
                        .attachFiles('./images/checkmark.png')
                        .setThumbnail('attachment://checkmark.png')
                        .addFields(
                            { name: "What now?", value: 'You can now use +checkpet to show off your amazing new pet!', inline: true },
                        )
                        .setTimestamp()
                        .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                    message.channel.send(SuccessEmbed);
                }else{
                    Data.table.push({userID: userID, pet: pet});
                    json = JSON.stringify(Data)
                    FS.writeFile('./pets.json', json, 'utf8', (err) => {
                        if(err){console.log(err)};
                    })
                    const SuccessEmbed = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle('Success!')
                        .setDescription('You have purchased the pet **' + pet + '**!')
                        .attachFiles('./images/checkmark.png')
                        .setThumbnail('attachment://checkmark.png')
                        .addFields(
                            { name: "What now?", value: 'You can now use +checkpet to show off your amazing new pet!', inline: true },
                        )
                        .setTimestamp()
                        .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                    message.channel.send(SuccessEmbed);
                }
            });
        }
        if (Arguments[0] === "1"){
            FS.readFile('./economy.json', (err, data) => {
                const Data = JSON.parse(data);
                var userID = message.author.id.toString()
                for (var i in Data.table) {
                    if (Data.table[i].userID === userID) {
                        if (Data.table[i].bCoins >= 5000){
                            Data.table[i].bCoins = Data.table[i].bCoins - 5000
                            setPet('Bobgo')
                            json = JSON.stringify(Data)
                            FS.writeFile('./economy.json', json, 'utf8', (err) => {
                                if(err){console.log(err)};
                            })
                        }else{
                            const FailedEmbed = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setTitle('Failure!')
                                .setDescription('You do not have enough Bongo Coins!')
                                .setTimestamp()
                                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                            message.channel.send(FailedEmbed);
                        }
                        break;
                    }
                }
            });
        }
        if (Arguments[0] === "2"){
            FS.readFile('./economy.json', (err, data) => {
                const Data = JSON.parse(data);
                var userID = message.author.id.toString()
                for (var i in Data.table) {
                    if (Data.table[i].userID === userID) {
                        if (Data.table[i].bCoins >= 10000){
                            Data.table[i].bCoins = Data.table[i].bCoins - 10000
                            setPet('Evil Bobgo')
                            json = JSON.stringify(Data)
                            FS.writeFile('./economy.json', json, 'utf8', (err) => {
                                if(err){console.log(err)};
                            })
                        }else{
                            const FailedEmbed = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setTitle('Failure!')
                                .setDescription('You do not have enough Bongo Coins!')
                                .setTimestamp()
                                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                            message.channel.send(FailedEmbed);
                        }
                        break;
                    }
                }
            });
        }
        if (Arguments[0] === "3"){
            FS.readFile('./economy.json', (err, data) => {
                const Data = JSON.parse(data);
                var userID = message.author.id.toString()
                for (var i in Data.table) {
                    if (Data.table[i].userID === userID) {
                        if (Data.table[i].bCoins >= 15000){
                            Data.table[i].bCoins = Data.table[i].bCoins - 15000
                            setPet('Yellow Bobgo')
                            json = JSON.stringify(Data)
                            FS.writeFile('./economy.json', json, 'utf8', (err) => {
                                if(err){console.log(err)};
                            })
                        }else{
                            const FailedEmbed = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setTitle('Failure!')
                                .setDescription('You do not have enough Bongo Coins!')
                                .setTimestamp()
                                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                            message.channel.send(FailedEmbed);
                        }
                        break;
                    }
                }
            });
        }
        if (Arguments[0] === "4"){
            FS.readFile('./economy.json', (err, data) => {
                const Data = JSON.parse(data);
                var userID = message.author.id.toString()
                for (var i in Data.table) {
                    if (Data.table[i].userID === userID) {
                        if (Data.table[i].bCoins >= 15000){
                            Data.table[i].bCoins = Data.table[i].bCoins - 15000
                            setPet('Blue Bobgo')
                            json = JSON.stringify(Data)
                            FS.writeFile('./economy.json', json, 'utf8', (err) => {
                                if(err){console.log(err)};
                            })
                        }else{
                            const FailedEmbed = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setTitle('Failure!')
                                .setDescription('You do not have enough Bongo Coins!')
                                .setTimestamp()
                                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                            message.channel.send(FailedEmbed);
                        }
                        break;
                    }
                }
            });
        }
        if (Arguments[0] === "5"){
            FS.readFile('./economy.json', (err, data) => {
                const Data = JSON.parse(data);
                var userID = message.author.id.toString()
                for (var i in Data.table) {
                    if (Data.table[i].userID === userID) {
                        if (Data.table[i].bCoins >= 50000){
                            Data.table[i].bCoins = Data.table[i].bCoins - 50000
                            setPet('Queen Bobgo')
                            json = JSON.stringify(Data)
                            FS.writeFile('./economy.json', json, 'utf8', (err) => {
                                if(err){console.log(err)};
                            })
                        }else{
                            const FailedEmbed = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setTitle('Failure!')
                                .setDescription('You do not have enough Bongo Coins!')
                                .setTimestamp()
                                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                            message.channel.send(FailedEmbed);
                        }
                        break;
                    }
                }
            });
        }
    }
    if (Command === "rshop") {
        FS.readFile('./ranks.json', (err, data) => {
            if (err) {
                console.log(err)
            }
            const Data = JSON.parse(data);
            var userID = message.author.id.toString()
            const SuccessEmbed = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Rank Shop!')
                .setDescription('Type +rbuy[rank id] to purchase a rank.')
                .addFields(
                    { name: 'New', value: 'ID: 1 [COST: 1000]', inline: true },
                    { name: 'Experienced', value: 'ID: 2 [COST: 5000]', inline: true },
                    { name: 'Professional', value: 'ID: 3 [COST: 10000]', inline: true },
                    { name: 'Bongo Buddy', value: 'ID: 4 [COST: 25000]', inline: true },
                    { name: 'Bongo God', value: 'ID: 5 [COST: 50000]', inline: true },
                )
                .setTimestamp()
                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
            message.channel.send(SuccessEmbed);
        })
    }
    if (Command === "rbuy"){
        function setRank( rank ){
            FS.readFile('./ranks.json', (err, data) => {
                if (err) {
                    console.log(err)
                }
                const Data = JSON.parse(data);
                var userID = message.author.id.toString()
                if (data.includes(userID)){
                    for (var i in Data.table) {
                        if (Data.table[i].userID === userID) {
                            Data.table[i].rank = rank;
                            break;
                        }
                    }
                    json = JSON.stringify(Data)
                    FS.writeFile('./ranks.json', json, 'utf8', (err) => {
                        if(err){console.log(err)};
                    })
                    const SuccessEmbed = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle('Success!')
                        .setDescription('You have purchased the rank **' + rank + '**!')
                        .attachFiles('./images/checkmark.png')
                        .setThumbnail('attachment://checkmark.png')
                        .addFields(
                            { name: "What now?", value: 'You can now use +checkrank to show off your amazing new rank!', inline: true },
                        )
                        .setTimestamp()
                        .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                    message.channel.send(SuccessEmbed);
                }else{
                    Data.table.push({userID: userID, rank: rank});
                    json = JSON.stringify(Data)
                    FS.writeFile('./ranks.json', json, 'utf8', (err) => {
                        if(err){console.log(err)};
                    })
                    const SuccessEmbed = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle('Success!')
                        .setDescription('You have purchased the rank **' + rank + '**!')
                        .attachFiles('./images/checkmark.png')
                        .setThumbnail('attachment://checkmark.png')
                        .addFields(
                            { name: "What now?", value: 'You can now use +checkrank to show off your amazing new rank!', inline: true },
                        )
                        .setTimestamp()
                        .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                    message.channel.send(SuccessEmbed);
                }
            });
        }
        if (Arguments[0] === "1"){
            FS.readFile('./economy.json', (err, data) => {
                const Data = JSON.parse(data);
                var userID = message.author.id.toString()
                for (var i in Data.table) {
                    if (Data.table[i].userID === userID) {
                        if (Data.table[i].bCoins >= 1000){
                            Data.table[i].bCoins = Data.table[i].bCoins - 1000
                            setRank('New')
                            json = JSON.stringify(Data)
                            FS.writeFile('./economy.json', json, 'utf8', (err) => {
                                if(err){console.log(err)};
                            })
                        }else{
                            const FailedEmbed = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setTitle('Failure!')
                                .setDescription('You do not have enough Bongo Coins!')
                                .setTimestamp()
                                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                            message.channel.send(FailedEmbed);
                        }
                        break;
                    }
                }
            });
        }
        if (Arguments[0] === "2"){
            FS.readFile('./economy.json', (err, data) => {
                const Data = JSON.parse(data);
                var userID = message.author.id.toString()
                for (var i in Data.table) {
                    if (Data.table[i].userID === userID) {
                        if (Data.table[i].bCoins >= 5000){
                            Data.table[i].bCoins = Data.table[i].bCoins - 5000
                            setRank('Experienced')
                            json = JSON.stringify(Data)
                            FS.writeFile('./economy.json', json, 'utf8', (err) => {
                                if(err){console.log(err)};
                            })
                        }else{
                            const FailedEmbed = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setTitle('Failure!')
                                .setDescription('You do not have enough Bongo Coins!')
                                .setTimestamp()
                                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                            message.channel.send(FailedEmbed);
                        }
                        break;
                    }
                }
            });
        }
        if (Arguments[0] === "3"){
            FS.readFile('./economy.json', (err, data) => {
                const Data = JSON.parse(data);
                var userID = message.author.id.toString()
                for (var i in Data.table) {
                    if (Data.table[i].userID === userID) {
                        if (Data.table[i].bCoins >= 10000){
                            Data.table[i].bCoins = Data.table[i].bCoins - 10000
                            setRank('Professional')
                            json = JSON.stringify(Data)
                            FS.writeFile('./economy.json', json, 'utf8', (err) => {
                                if(err){console.log(err)};
                            })
                        }else{
                            const FailedEmbed = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setTitle('Failure!')
                                .setDescription('You do not have enough Bongo Coins!')
                                .setTimestamp()
                                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                            message.channel.send(FailedEmbed);
                        }
                        break;
                    }
                }
            });
        }
        if (Arguments[0] === "4"){
            FS.readFile('./economy.json', (err, data) => {
                const Data = JSON.parse(data);
                var userID = message.author.id.toString()
                for (var i in Data.table) {
                    if (Data.table[i].userID === userID) {
                        if (Data.table[i].bCoins >= 25000){
                            Data.table[i].bCoins = Data.table[i].bCoins - 25000
                            setRank('Bongo Buddy')
                            json = JSON.stringify(Data)
                            FS.writeFile('./economy.json', json, 'utf8', (err) => {
                                if(err){console.log(err)};
                            })
                        }else{
                            const FailedEmbed = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setTitle('Failure!')
                                .setDescription('You do not have enough Bongo Coins!')
                                .setTimestamp()
                                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                            message.channel.send(FailedEmbed);
                        }
                        break;
                    }
                }
            });
        }
        if (Arguments[0] === "5"){
            FS.readFile('./economy.json', (err, data) => {
                const Data = JSON.parse(data);
                var userID = message.author.id.toString()
                for (var i in Data.table) {
                    if (Data.table[i].userID === userID) {
                        if (Data.table[i].bCoins >= 50000){
                            Data.table[i].bCoins = Data.table[i].bCoins - 50000
                            setRank('Bongo God')
                            json = JSON.stringify(Data)
                            FS.writeFile('./economy.json', json, 'utf8', (err) => {
                                if(err){console.log(err)};
                            })
                        }else{
                            const FailedEmbed = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setTitle('Failure!')
                                .setDescription('You do not have enough Bongo Coins!')
                                .setTimestamp()
                                .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                            message.channel.send(FailedEmbed);
                        }
                        break;
                    }
                }
            });
        }
    }
    if (Command === "warn") {
        if (Arguments[0]){
            const target = message.mentions.users.first()
            if (message.member.hasPermission('KICK_MEMBERS')) {
                const SuccessEmbed = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Warning!')
                    .setDescription('Hey <@' + target + '>! You have been **warned** by <@' + message.author + '>! Whatever you did cut it out!')
                    .addFields(
                        { name: "What now?", value: "Don't worry! You aren't in some deep trouble this message is just a notice from a staff member! It does not go on any records.", inline: true },
                    )
                    .setTimestamp()
                    .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                message.channel.send(SuccessEmbed);
            }else{
                const FailedEmbed = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Failure!')
                    .setDescription('Hey <@' + message.author + '> you dont have permission to do that! You need to have the "Kick Members" permission to warn!')
                    .setTimestamp()
                    .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                message.channel.send(FailedEmbed);
            }
        }else{
            const FailedEmbed = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Failure!')
                    .setDescription('Hey <@' + message.author + '> you forgot to ping your target!')
                    .setTimestamp()
                    .setFooter('Bongo', 'https://i.imgur.com/DpaL5XC.png');
                message.channel.send(FailedEmbed);
        }
        
    }

    // more commands below \\
});

// client start \\
Client.login(Configuration.token)