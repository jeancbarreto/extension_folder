// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const { promises } = require('dns');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */


function activate(context) {

	const createFolder = (name, key) => new Promise(
	(resolve, reject) => {
		try{
			shell.mkdir('-p', name);
			key.file_dependency.map(x => {
				fs.writeFile(path.resolve(name, `${x.file}.scss`), x.comment, function (err) {
					if (err) throw err;
					console.log(`Saved ${x.file}.scss!`);
				  });
			})
		}catch(err){
			reject(err);
		}
	}
)

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "sass-folder" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('sass-folder.create', function () {
		// The code you place here will be executed every time your command is executed
		const folderPath = vscode.workspace.workspaceFolders[0].uri.path.slice(1, vscode.workspace.workspaceFolders[0].uri.path.length);
		const type_folder = [
			{
				name:"abstracts",
				file_dependency: [
					{file: "_functions", comment: "//This file you will create your functions inside of the project"},
					{file: "_mixins", comment: "//This file you will create your mixins inside of the project"},
					{file: "_variables", comment: "//This file you will create your variables inside of the project"},
				]
			},
			{
				name: "base",
				file_dependency: [
					{file: "_base", comment: "//This file you will create your base style inside of the project"},
					{file: "_reset", comment: "//This file you will create your style base of reset inside of the project"},
					{file: "_typography", comment: "//This file you will create your rule of typographys inside of the project"},
				]
			},
			{
				name:"components",
				file_dependency:[
					{file: "_buttons", comment: "//This file you will create your style for buttons inside of the project"},
					{file: "_inputs", comment: "//This file you will create your style for inputs inside of the project"},
				]
			},
			{
				name:"layout",
				file_dependency:[
					{file: "_footer", comment: "//This file is for create your style with relation on space of footer"},
					{file: "_header", comment: "//This file is for create your style with relation on space of header"},
					{file: "_main", comment: "//This file is for create your style with relation on space of main"},
					{file: "_navbar", comment: "//This file is for create your style with relation on space of navbar"},
					{file: "_pagination", comment: "//This file is for create your style with relation on space of pagination"},
				]
			},
			{
				name: "pages",
				file_dependency:[]
			},
			{
				name:"Themes",
				file_dependency:[]
			},
			{
				name:"vendors",
				file_dependency:[]
			}
	]

		let exec = []
		type_folder.map((key) => {
			let folderbase = path.resolve(folderPath, "css/sass", `${key.name}`)
			createFolder(folderbase, key).then(ok => {
				if(ok){

				}else{
					console.log('Ocurrio un error 1')
				}
			}).catch(err => {
				console.log(err)
			})

		})
		// Display a message box to the user
		vscode.window.showInformationMessage('Pattern 7-1 crated!');
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
