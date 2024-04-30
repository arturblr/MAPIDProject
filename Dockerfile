# Step 1: Choose a base image
FROM openjdk:17

# Step 2: Copy the compiled JAR file into the container
COPY target/MAPIDProject-1.0.jar MAPIDProject-1.0.jar

# Step 3: Define the command to run the application
CMD ["java", "-jar", "MAPIDProject-1.0.jar"]
