# alexa-skills
Repository of skills

# Build
```bash
> docker-machine start --driver virtualbox dev
> eval "$(docker-machine env dev)"
> docker run -it -v$(pwd):/app -w /app node:0.10.40 npm install
```
