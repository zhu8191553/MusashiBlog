const model = require('../model')
const moment = require('moment')
let {userConcern,User} = model.AllModels;
module.exports = {
    'POST /api/addUconcern': async (ctx, next) => {
        ctx.response.type = 'application/json';
        let concern = await userConcern.findAll({
            where: {
                sendUid: ctx.request.body.sendUid,
                toUid: ctx.request.body.toUid
            }
        })
        if (concern.length === 0) {
            let Uconcern = await userConcern.create({
                sendUid: ctx.request.body.sendUid,
                toUid: ctx.request.body.toUid
            })
            ctx.response.body = 1;
        } else {
            ctx.response.body = 0;
        }

    },
    'POST /api/getUconcern': async (ctx, next) => {
        ctx.response.type = 'application/json';

        let uid = ctx.request.body.uid
        console.log(uid,"iddddddddddddddddddddd")
        let Uconcern = await userConcern.findAll({})
        let user = await User.findAll({})
        let fans = []
        let concern = []
        Uconcern.forEach(element => {
            user.forEach(uItem => {
                if (element.sendUid === uid) {
                    if (uItem.id === element.toUid) {
                        concern.push(uItem)
                    }
                } else if (element.toUid === uid) {
                    if (uItem.id === element.sendUid) {
                        fans.push(uItem)
                    }
                }
            });
        });
        ctx.response.body = {'fans': fans,'concern': concern};
    },
};
