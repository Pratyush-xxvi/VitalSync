# Stage 1: Build stage using Maven and JDK 17
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# Copy maven wrapper and pom.xml first for layer caching
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code and build final executable JAR
COPY src src
RUN ./mvnw package -DskipTests

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
