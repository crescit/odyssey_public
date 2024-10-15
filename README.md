Look at different directories to see how to run containers individually 
### TO RUN WITH KUBERNETES
### Pre-reqs
This application is containerized through kubernetes. To run the application 
make sure you have docker, kubernetes, and minikube installed. 
### To-run 
Have docker and kubernetes running, 
In the root folder of the project apply the templates under k8s
in your terminal type: '''kubectl apply -f ./k8s```
### ACCESS 
To run locally make sure you have your postgres envs, and in your terminal get your ip 
'''minikube ip''' 
once you get that address do ${minikube_ip} to access the website or ${minikube_ip}/api to access the endpoints

### Running prod 
Connect to the odyssey-prod context in aws region 1
Applelonia-II:odyssey josh$ docker compose -f docker-compose-prod.yml up
To list the processes running in the context 
Applelonia-II:odyssey josh$ docker compose ps

### changing aws region defaults for docker context 
Applelonia-II:odyssey josh$ vim ~/.aws/config

### Updating services on aws

If you know how to update a single service and have it work 

get list of clusters on ecs

aws ecs list-clusters
-> grab cluster arn 

list services running on odyssey cluster

aws ecs list-services --cluster arn:aws:ecs:us-west-2:${accountId}:cluster/odyssey

update client service specifically
aws ecs update-service --cluster arn:aws:ecs:us-west-2:${accountId}:cluster/odyssey --service arn:aws:ecs:us-west-2:${accountId}:service/odyssey/${odysseyClientServiceName} --force-new-deployment

Otherwise 

Docker context use (odyssey aws context)
docker compose -f docker-compose-prod.yml up

