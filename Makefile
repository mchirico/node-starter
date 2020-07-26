PROJECT = septapig
NAME = nodestarter
TAG = dev

.PHONY: docker-build
docker-build:
	docker build --no-cache -t gcr.io/$(PROJECT)/$(NAME):$(TAG) -f Dockerfile .

.PHONY: kind
kind:
	kind load docker-image gcr.io/$(PROJECT)/$(NAME):$(TAG)

.PHONY: push
push:
	docker push gcr.io/$(PROJECT)/$(NAME):$(TAG) 

.PHONY: pull
pull:
	docker pull gcr.io/$(PROJECT)/$(NAME):$(TAG) 

.PHONY: deploy
deploy:
	gcloud config set gcloudignore/enabled false --project $(PROJECT)
	gcloud builds submit --tag gcr.io/$(PROJECT)/$(NAME)cloud --project $(PROJECT) --timeout 35m23s
	gcloud run deploy $(NAME)cloud --image gcr.io/$(PROJECT)/$(NAME)cloud \
              --platform managed --allow-unauthenticated --project $(PROJECT) \
              --region us-east1 --port 3000 --max-instances 3  --memory 128Mi


.PHONY: run
run:
	docker run -p 3000:3000 --rm -it -d --name $(NAME) gcr.io/$(PROJECT)/$(NAME):$(TAG) 


.PHONY: runnod
runnod:
	docker run -p 3000:3000 --rm -it --name $(NAME) gcr.io/$(PROJECT)/$(NAME):$(TAG) 

.PHONY: stop
stop:
	docker stop $(NAME)


.PHONY: logs
logs:
	docker logs $(NAME)



