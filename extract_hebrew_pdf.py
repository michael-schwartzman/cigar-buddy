#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import pdfplumber
import PyPDF2
import sys
import io

def extract_text_with_pdfplumber(pdf_path):
    """Extract text using pdfplumber - better for complex layouts"""
    try:
        text = ""
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n\n"
        return text
    except Exception as e:
        print(f"Error with pdfplumber: {e}")
        return None

def extract_text_with_pypdf2(pdf_path):
    """Extract text using PyPDF2 - alternative method"""
    try:
        text = ""
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n\n"
        return text
    except Exception as e:
        print(f"Error with PyPDF2: {e}")
        return None

def main():
    pdf_path = "/Users/mschwartzman/Documents/Code/cigar/4673708_1 הסכם חתום.PDF"
    
    print("מחלץ טקסט מקובץ PDF...")
    print("=" * 50)
    
    # Try pdfplumber first (usually better for Hebrew)
    text = extract_text_with_pdfplumber(pdf_path)
    
    if not text or len(text.strip()) < 100:
        print("מנסה שיטה חלופית...")
        text = extract_text_with_pypdf2(pdf_path)
    
    if text and len(text.strip()) > 0:
        print("הטקסט שחולץ מהקובץ:")
        print("=" * 50)
        print(text)
        
        # Save to file
        output_file = "/Users/mschwartzman/Documents/Code/cigar/extracted_hebrew_text.txt"
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"\nהטקסט נשמר גם בקובץ: {output_file}")
    else:
        print("לא הצלחתי לחלץ טקסט מהקובץ. ייתכן שהקובץ מכיל תמונות או טקסט שאינו ניתן לחילוץ.")

if __name__ == "__main__":
    main()
