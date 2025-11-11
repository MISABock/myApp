package com.myapp.demo.controller;

import com.myapp.demo.dto.WatchlistAddDTO;
import com.myapp.demo.model.Stock;
import com.myapp.demo.model.WatchlistEntry;
import com.myapp.demo.repository.StockRepository;
import com.myapp.demo.repository.WatchlistRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {

    private final WatchlistRepository repo;
    private final StockRepository stockRepo;

    public WatchlistController(WatchlistRepository repo, StockRepository stockRepo) {
        this.repo = repo;
        this.stockRepo = stockRepo;
    }

    @PostMapping("/add")
    public WatchlistEntry add(@RequestBody WatchlistAddDTO dto) {

        System.out.println("POST /api/watchlist/add erhalten: userId=" + dto.getUserId() + " symbol=" + dto.getSymbol());

        Stock stock = stockRepo.findBySymbol(dto.getSymbol())
                .orElseThrow(() -> new RuntimeException("Stock not found"));

        System.out.println("Gefundener Stock: " + stock.getId() + " " + stock.getSymbol());

        WatchlistEntry entry = new WatchlistEntry();
        entry.setUserId(dto.getUserId());
        entry.setStock(stock);

        WatchlistEntry saved = repo.save(entry);

        System.out.println("Watchlist gespeichert mit ID: " + saved.getId());
        return saved;
    }

    @GetMapping("/{userId}")
    public List<WatchlistEntry> list(@PathVariable Long userId) {
        System.out.println("GET /api/watchlist/" + userId);
        return repo.findByUserId(userId);
    }
    @DeleteMapping("/{entryId}")
    public void delete(@PathVariable Long entryId) {
        repo.deleteById(entryId);
    }

}
