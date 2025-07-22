#!/usr/bin/env bash

# Step 1: Install build dependencies early
pip install --upgrade pip setuptools wheel

# Step 2: Install from requirements
pip install -r project/requirements.txt
