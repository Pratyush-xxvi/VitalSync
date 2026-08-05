# Stage 1: Build stage using Maven and JDK 17
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# Copy source files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# Make mvnw executable and build the executable JAR
RUN chmod +x mvnw && ./mvnw package -DskipTests

# Stage 2: Runtime stage using lightweight JRE 17
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Create non-root app user for security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy built jar from build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8081

ENV PORT=8081

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
