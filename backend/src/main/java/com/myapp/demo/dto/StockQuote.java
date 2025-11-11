package com.myapp.demo.dto;

public class StockQuote {

    private double current;
    private double change;
    private double percentChange;
    private double open;
    private double high;
    private double low;
    private double previousClose;

    // Getter und Setter
    public double getCurrent() { return current; }
    public void setCurrent(double current) { this.current = current; }

    public double getChange() { return change; }
    public void setChange(double change) { this.change = change; }

    public double getPercentChange() { return percentChange; }
    public void setPercentChange(double percentChange) { this.percentChange = percentChange; }

    public double getOpen() { return open; }
    public void setOpen(double open) { this.open = open; }

    public double getHigh() { return high; }
    public void setHigh(double high) { this.high = high; }

    public double getLow() { return low; }
    public void setLow(double low) { this.low = low; }

    public double getPreviousClose() { return previousClose; }
    public void setPreviousClose(double previousClose) { this.previousClose = previousClose; }
}
