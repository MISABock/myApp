package com.myapp.demo.controller;

import com.myapp.demo.service.StockPriceService;
import com.myapp.demo.dto.StockQuote;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/price")
public class StockPriceController {

    private final StockPriceService service;

    public StockPriceController(StockPriceService service) {
        this.service = service;
    }

    @GetMapping("/{symbol}")
    public StockQuote getFullPrice(@PathVariable String symbol) throws Exception {
        return service.getQuote(symbol);
    }
}
