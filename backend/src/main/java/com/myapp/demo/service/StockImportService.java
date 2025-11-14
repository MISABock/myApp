package com.myapp.demo.service;

import com.myapp.demo.model.Stock;
import com.myapp.demo.repository.StockRepository;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

@Service
public class StockImportService {

    private final StockRepository stockRepository;

    public StockImportService(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    public void init() {
        try {
            importStocks();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void importStocks() throws Exception {

        URL url = new URL("https://raw.githubusercontent.com/datasets/s-and-p-500-companies/master/data/constituents.csv");
        URLConnection conn = url.openConnection();
        conn.setRequestProperty("User-Agent", "Mozilla/5.0");

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {

            String line;
            boolean first = true;

            while ((line = reader.readLine()) != null) {

                if (first) {
                    first = false;
                    continue;
                }

                String[] parts = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");
                if (parts.length < 2) continue;

                String symbol = parts[0].trim();

                // Nur speichern, wenn Symbol noch nicht existiert
                if (stockRepository.findBySymbol(symbol).isEmpty()) {

                    Stock stock = new Stock();
                    stock.setSymbol(symbol);
                    stock.setName(parts[1].trim());
                    stock.setExchange("S&P500");

                    stockRepository.save(stock);
                }
            }
        }
    }
}
