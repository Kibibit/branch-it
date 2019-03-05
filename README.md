<p align="center">
  <a href="https://github.com/Kibibit/bramch-it" target="blank"><img src="https://cdn0.iconfinder.com/data/icons/octicons/1024/git-branch-512.png" width="150" ></a>
  <h2 align="center">
    @kibibit/branch-it
  </h2>
</p>
<p align="center">
  <a href="https://salt.bountysource.com/teams/kibibit"><img src="https://img.shields.io/endpoint.svg?url=https://monthly-salt.now.sh/kibibit&style=flat-square"></a>
</p>
<p align="center">
  update branch and tag references for semantic-release
</p>
<hr>

This was written in order to automate & simplify our @next and @stable releases

## Installation

```
npm install --save-dev @kibibit/branch-it
```

## Usage

On your deployment platform, before running your semantic-release command, run the following:

```
npx branch-it
```

### Options

Options can either be set through the `package.json` file or as command line flags:

```
npx branch-it --tag tagName --branch branchName
```
OR
```
npx branch-it --t tagName --b branchName
```
OR
```
npx branch-it
```

with this in the `package.json`:
```
"release": {
  // shares the same space as semantic-release
  "versionMapping": {
    "master": "stable",
    "develop": "next"
  }
}
```
