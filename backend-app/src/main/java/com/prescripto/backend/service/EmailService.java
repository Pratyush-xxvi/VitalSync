package com.prescripto.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Value("${BREVO_API_KEY:}")
    private String brevoApiKey;

    @Async
    public void sendEmail(String to, String subject, String body) {
        logger.info("EMAIL_SERVICE: Attempting to send email to: {}", to);
        try {
            URL url = new URL("https://api.brevo.com/v3/smtp/email");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("api-key", brevoApiKey);
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Accept", "application/json");
            conn.setDoOutput(true);
            conn.setConnectTimeout(15000);
            conn.setReadTimeout(15000);

            // Escape special characters for JSON
            String safeBody = body.replace("\\", "\\\\")
                                  .replace("\"", "\\\"")
                                  .replace("\n", "\\n")
                                  .replace("\r", "");
            String safeSubject = subject.replace("\"", "\\\"");

            String json = "{" +
                "\"sender\":{\"name\":\"VitalSync\",\"email\":\"pratived2610@gmail.com\"}," +
                "\"to\":[{\"email\":\"" + to + "\"}]," +
                "\"subject\":\"" + safeSubject + "\"," +
                "\"textContent\":\"" + safeBody + "\"" +
                "}";

            try (OutputStream os = conn.getOutputStream()) {
                os.write(json.getBytes(StandardCharsets.UTF_8));
            }

            int responseCode = conn.getResponseCode();
            if (responseCode >= 200 && responseCode < 300) {
                logger.info("EMAIL_SERVICE: Email sent SUCCESSFULLY to: {} (HTTP {})", to, responseCode);
            } else {
                String error = new String(conn.getErrorStream().readAllBytes(), StandardCharsets.UTF_8);
                logger.error("EMAIL_SERVICE: FAILED to send email to: {}. HTTP {}: {}", to, responseCode, error);
            }
        } catch (Exception e) {
            logger.error("EMAIL_SERVICE: FAILED to send email to: {}. Error: {}", to, e.getMessage(), e);
        }
    }
}