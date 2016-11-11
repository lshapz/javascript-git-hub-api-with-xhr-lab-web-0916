const rootURL = "https://api.github.com"

function getRepositories() {
  var username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  const uri = rootURL + "/users/" + username + "/repos" //?sort=updated
  req.addEventListener("load", displayRepositories)
  req.open("GET", uri)
  req.send()
  return false;
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  // console.log(repos)
  const repoList = "<ul>" + repos.map(r => {
    const dataUser = 'data-username="' + r.owner.login + '"';
    const dataRepo = 'data-repository="' + r.name + '"';
    return (`
      <li>
      <h2>${r.name}</h2>
      <a href="${r.html_url}">${r.html_url}</a><br>
      <a href="#" ${dataRepo} ${dataUser} onclick="getCommits(this)">Get Commits</a><br>
      <a href="#" ${dataRepo} ${dataUser} onclick="getBranches(this)">Get Branches</a></li>

      </li> `)}).join('') + "</ul>"
    document.getElementById("repositories").innerHTML = repoList

}

function getCommits(el) {
  const name = el.dataset.repository
    const uri = rootURL + "/repos/" + el.dataset.username + "/" + name + "/commits"

  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", uri)
  req.send()
}


function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}



function getBranches(el) {
  const repoName = el.dataset.repository
  const uri = rootURL + "/repos/" + el.dataset.username + "/" + repoName + "/branches"
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayBranches)
  xhr.open("GET", uri)
  xhr.send()
}
function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

