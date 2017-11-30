var spawn = require('child_process').spawn;

/**
 * Extract text from pdf using pdftotext external program
 * @param  String  pdf_path absolute path to pdf
 * @param  Object   options  {from: 1, to: 23}
 * @param  Function callback with params (err, output)
 * @return {[type]}            [description]
 */
module.exports.process = function(pdf_path, options, callback) {

  var args = [];
  if (typeof options !== 'function') {
    if (options && options.from && !isNaN(options.from)) {
      args.push('-f');
      args.push(options.from)
    };
    if (options && options.to && !isNaN(options.to)) {
      args.push('-l');
      args.push(options.to)
    };
  } else {
    callback = options;
  }



  args.push('-layout');
  args.push('-enc');
  args.push('UTF-8');
  args.push(pdf_path);
  args.push('-');

  var child = spawn('pdftotext', args);

  var stdout = child.stdout;
  var stderr = child.stderr;
  var output = '';
<<<<<<< HEAD
  var stderr_output = '';
=======
  var err;
>>>>>>> feb1fd3ecb176f722a163420f7e024eed3d48122

  stdout.setEncoding('utf8');
  stderr.setEncoding('utf8');


  stderr.on('data', function(data) {
<<<<<<< HEAD
    stderr_output += data;
    // return callback(data, null);
  });

  stderr.on('close', function(data) {
    // stderr_output += data;
    return callback(stderr_output, null);
=======
    err = true;
    return callback(data, null);
>>>>>>> feb1fd3ecb176f722a163420f7e024eed3d48122
  });

  // buffer the stdout output
  stdout.on('data', function(data) {
    output += data;
  });

  stdout.on('close', function(code) {
    if (err) {
      return;
    }
    if (code) {
      callback('pdftotext end with code ' + code, null);
    }
    callback(null, output);

  });
};
