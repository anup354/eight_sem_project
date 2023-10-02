const db = require('../../constant/db')
const slug = require("slug");
const validateBank = require('../../validation/bank/bankValidation');
const { format } = require('date-fns');

const fs = require('fs');


function imageDelete(id, connection) {
  const sqlGet = `SELECT image FROM blogs WHERE blog_id=${id}`;
  connection.query(sqlGet, (err, result) => {
    connection.release();

    const image = result[0].image;
    fs.unlink("./public/images/" + image, (err, result) => {
      if (err) {
        throw err;
      }
    });
  });
}

module.exports.addBlog = async (request, response) => {
  const connection = await db.conn();
  const validateBlog = await validateBank.addBlog(request)
  validateBlog.check().then((matched) => {
    if (!matched) {
      return response.status(400).
        json({ errors: validateBlog.errors })
    }
    const data =
    {
      blog_name: request.body.blog_name,
      description: request.body.description,
      slug: slug(request.body.blog_name),
      image: request.file.filename,
      date: format(new Date(), 'yyyy-MM-dd')
    }

    const query = 'insert into blogs SET ?';
    connection.query(query, data, (error, results) => {
      connection.release();

      if (error) {
        return response.status(400).json({
          message: "Some problem occured" + error,
          success: false,
        })
      }
      else {
        return response.status(200).json({
          message: "success",
          success: true,
        })
      }
    });
  });
}

module.exports.getBlog = async (request, response) => {
  const connection = await db.conn();

  const getquery = `select * ,CONCAT('http://localhost:8080/',image) as blog_image from blogs `
  // ORDER BY category_order ASC
  connection.query(getquery, (err, result) => {
    connection.release();

    if (err) {
      return response.status(400).json({
        message: "Some problem occured",
        sucess: false,
      })

    }
    else {
      return response.status(200).json({
        message: "Sucess",
        sucess: true,
        data: result

      })
    }
  })

};

module.exports.getByIdBlog = async (request, response) => {
  const connection = await db.conn();
  const blogid = request.params.blog_id;
  const getquery = `select * ,CONCAT('http://localhost:8080/',image) as blog_image from blogs where blog_id=${blogid}`
  // ORDER BY category_order ASC
  connection.query(getquery, (err, result) => {
    connection.release();

    if (err) {
      return response.status(400).json({
        message: "Some problem occured",
        sucess: false,
      })

    }
    else {
      return response.status(200).json({
        message: "Sucess",
        sucess: true,
        data: result[0]

      })
    }
  })

};

module.exports.updateBlog = async (request, response) => {
  const connection = await db.conn();
  const blogid = request.params.blog_id;

  const data = {
    blog_name: request.body.blog_name,
    description: request.body.description,
    slug: slug(request.body.blog_name),

  }
  if (request.file) {
    imageDelete(blogid, connection)
    data['image'] = request.file.filename
  }
  // console.log(data)
  connection.query(`update blogs SET ? where blog_id=${blogid}`, data, (error, result) => {
    connection.release();

    if (error) {
      return response.status(400).json({
        message: "Some problem occured" + error,
        sucess: false,
      })
    }
    else {
      return response.status(200).json({
        message: "Sucess",
        sucess: true,
        data: result
      })
    }
  })

};

// delete api 
module.exports.deleteBlog = async (request, response) => {
  const connection = await db.conn();

  const { blog_id } = request.params
  imageDelete(blog_id, connection)
  const deletequery = `DELETE FROM blogs WHERE blog_id= ${blog_id}`
  connection.query(deletequery, (error, result) => {
    connection.release();

    if (error) {
      response.status(400).json({
        message: "Data not deleted" + err,
        success: false
      })
    }
    else {

      response.status(200).json({
        message: "Data deleted",
        success: true
      })
    }
  });


}