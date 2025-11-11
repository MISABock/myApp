package com.myapp.demo.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.myapp.demo.dto.StockQuote    ;


@Service
public class StockPriceService {

    private final RestTemplate rest = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    public StockQuote getQuote(String symbol) throws Exception {

        System.out.println("Starte Quote-Abfrage für Symbol: " + symbol);

        String url = "https://finnhub.io/api/v1/quote?symbol=" + symbol +
                "&token=d4939upr01qshn3ke3bgd4939upr01qshn3ke3c0";

        System.out.println("URL: " + url);

        String response = rest.getForObject(url, String.class);

        System.out.println("Rohantwort von Finnhub: " + response);

        JsonNode root = mapper.readTree(response);

        StockQuote quote = new StockQuote();
        quote.setCurrent(root.path("c").asDouble());
        quote.setChange(root.path("d").asDouble());
        quote.setPercentChange(root.path("dp").asDouble());
        quote.setOpen(root.path("o").asDouble());
        quote.setHigh(root.path("h").asDouble());
        quote.setLow(root.path("l").asDouble());
        quote.setPreviousClose(root.path("pc").asDouble());

        return quote;
    }
}
