# CSV to JSON Stream Converter

A Node.js example that demonstrates how to build a **custom Transform stream** to convert large CSV files into JSON format — efficiently, without loading the entire dataset into memory.

---

## 🚀 Overview

This project shows how to create and use a custom `Transform` stream in Node.js to process data chunk-by-chunk.

Instead of reading the full CSV file at once, it streams data through a transformation pipeline:

