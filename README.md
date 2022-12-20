# WebZero

WebZero is an automated personal website generator.

After the user uploads a resume, WebZero will automatically parse the resume and generate a personal website based on the resume.

We leverage AWS S3 to store users' websites. We also rely on lever.co to provide resume parsing service.

We will connect the domain vendor with WebZero, so customers can choose a free domain directly from WebZero. (In progress)

## Heroku
https://webzero.herokuapp.com/

After signing up, choose a resume to upload (or simply upload the 'test-resume.pdf' in the root of our repo).

It can take several seconds for the backend to generate your personal website.

When the generation succeeds, the website link will show up. It is something like

`This is your website location: http://webzero-usdsdsd2.s3-website-us-east-1.amazonaws.com`

## Deployment

Step-by-step instructions on how to run our project:

(1) Clone this repo:

```shell
    $  git clone https://github.com/ESaaS-4995/WebZero
```
    
(2) Install podman:

Please refer to https://podman.io/getting-started/installation
    
On Ubuntu 20.04, for example,
    
```shell
    . /etc/os-release
    echo "deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/xUbuntu_${VERSION_ID}/ /" | sudo tee /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list
    curl -L "https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/xUbuntu_${VERSION_ID}/Release.key" | sudo apt-key add -
    sudo apt-get update
    sudo apt-get -y upgrade
    sudo apt-get -y install podman
```
    
(3) Run ./run_essas_ruby_development.sh
```bash
   cd WebZero
   ./run_essas_ruby_development.sh
```
## Reference
The template-0 of personal website is from https://github.com/JunqiZhang0/template
