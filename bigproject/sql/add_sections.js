/**
 * Created by web-01 on 2017/12/9.
 */
const mysql = require("mysql");
let pool = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    database:"miko",
    password:"",
    port:3306,
    connectionLimit:25
});
function getArr(){
    let section_name1=["主仆","可爱","温柔","善良","性感","金丝雀"];
    let section_name2=["闪耀","着","大便色","的","土豪","灵结"];
    let section_name3=["放开","那个","小白脸","让我来","捆绑","play"];
    let section_name4=["无人","顾及","你眼中","炙热","惨无人道","杀害"];
    let section_name5=["回归","正常","世界","我等","君来","未来"];
    let section_names = [];
    for(let i=0;i<300;i++){
        let section_name = section_name1[parseInt(Math.random()*4)]+
            (Math.random()>0.4?section_name2[parseInt(Math.random()*4)]:"")+
            "的"+
            (Math.random()>0.5?section_name3[parseInt(Math.random()*4)]:"")+
            (Math.random()>0.5?section_name4[parseInt(Math.random()*4)]:"")+
            (Math.random()>0.5?section_name5[parseInt(Math.random()*4)]:"");
        section_names.push(section_name);
    }
    return section_names;
}


function createTable(){
 for(let i = 100;i<300;i++){

// let section_names = getArr();
pool.getConnection((err,conn)=>{
    if(err) throw err;
    let sql = `CREATE TABLE story${i}_section(
        sid        INT PRIMARY KEY auto_increment,
        story_id   INT NOT NULL DEFAULT 0,
        section_name VARCHAR(128) NOT NULL DEFAULT ''
    )`;
    conn.query(sql,(err,result)=>{
        if(err) throw err;
        // var count = result[0]["c"];
        //总页数
        console.log(i);
        //释放连接
        conn.release();
    })
});
}}

function addsection_name(story_id){
     let section_names = getArr();
     for(let i=0;i<300;i++){
         let section_name = section_names[i];

         pool.getConnection((err,conn)=>{
             if(err) throw err;
             let sql = `insert into story${story_id}_section(story_id,section_name) values(${story_id},'${section_name}')`;
             conn.query(sql,(err,result)=>{
                 if(err) throw err;
                 // var count = result[0]["c"];
                 //总页数
                 console.log(story_id,i);
                 //释放连接
                 conn.release();
             })
        });
     }
}
for(let i =9;i<300;i++){
    addsection_name(i);
}