const rootURL = "https://api.github.com"

function getRepositories() {
  var username = $('input#username').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  const uri = rootURL + "/users/" + username + "/repos"
  req.addEventListener("load", displayRepositories)

  req.open("GET", uri)
  req.send()
  return false;
}

function getCommits(el) {
  const name = el.dataset.repo
    const uri = rootURL + "/repos/" + el.dataset.username + "/" +repoName + "/commits"

  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", uri)
  req.send()
}


function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.committer.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}


function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = "<ul>" repos.map(r => {
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
