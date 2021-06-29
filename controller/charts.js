const chartsService = require('../service/charts');

exports.requestBarChart = async(req,res)=>{
    var request_Chart_Data = await chartsService.requestBarChart(req.body);
    if(!request_Chart_Data){
        res.status(400).send("Error in Bar Chart Data Controller");
    }else{
        res.status(200).send(request_Chart_Data);
    }
}


exports.totalMoneyEarned = async(req,res)=>{
    var total_money = await chartsService.totalMoneyEarned(req.body);
    if(!total_money){
        res.status(400).send("Error in Bar Chart Data Controller");
    }else{
        res.status(200).send(total_money);
    }
}