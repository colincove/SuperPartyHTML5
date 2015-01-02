{
    body:{type:BodyTypes.BOX,
        config:{width:8, height:8, isTrigger:false, damp:0.2}
    },
    scripts:[
        "testScript"
    ],
    renderers:[
    ],
    triggers:[{name:"agro", type:BodyTypes.BOX,
        config:{width:15, height:15}}
    ]
}