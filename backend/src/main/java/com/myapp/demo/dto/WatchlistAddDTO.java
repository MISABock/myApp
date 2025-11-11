package com.myapp.demo.dto;

public class WatchlistAddDTO {

    private Long userId;
    private String symbol;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }
}
