package com.myapp.demo.repository;

import com.myapp.demo.model.WatchlistEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WatchlistRepository extends JpaRepository<WatchlistEntry, Long> {

    List<WatchlistEntry> findByUserId(Long userId);
}   