#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import pytesseract
from pdf2image import convert_from_path
import os
import sys
from PIL import Image

def extract_text_with_ocr(pdf_path):
    """Extract text using OCR with Hebrew language support"""
    try:
        print("ממיר PDF לתמונות...")
        # Convert PDF to images
        images = convert_from_path(pdf_path, dpi=300)  # High DPI for better OCR
        
        full_text = ""
        total_pages = len(images)
        print(f"נמצאו {total_pages} עמודים בקובץ")
        
        for i, image in enumerate(images, 1):
            print(f"מעבד עמוד {i} מתוך {total_pages}...")
            
            # OCR with Hebrew language support
            # Using multiple languages: Hebrew + English + Arabic (for better recognition)
            custom_config = r'--oem 3 --psm 6 -l heb+eng+ara'
            
            try:
                page_text = pytesseract.image_to_string(image, config=custom_config)
                if page_text.strip():
                    full_text += f"\n--- עמוד {i} ---\n"
                    full_text += page_text + "\n\n"
                else:
                    print(f"לא נמצא טקסט בעמוד {i}")
            except Exception as page_error:
                print(f"שגיאה בעיבוד עמוד {i}: {page_error}")
                continue
        
        return full_text.strip()
        
    except Exception as e:
        print(f"שגיאה בחילוץ טקסט עם OCR: {e}")
        return None

def main():
    pdf_path = "/Users/mschwartzman/Documents/Code/cigar/4673708_1 הסכם חתום.PDF"
    
    if not os.path.exists(pdf_path):
        print(f"הקובץ לא נמצא: {pdf_path}")
        return
    
    print("מתחיל חילוץ טקסט עברי באמצעות OCR...")
    print("זה עלול לקחת מספר דקות...")
    print("=" * 60)
    
    # Extract text using OCR
    text = extract_text_with_ocr(pdf_path)
    
    if text and len(text.strip()) > 0:
        print("\n" + "=" * 60)
        print("הטקסט שחולץ מהקובץ:")
        print("=" * 60)
        print(text)
        
        # Save to file
        output_file = "/Users/mschwartzman/Documents/Code/cigar/extracted_hebrew_text.txt"
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"\n{'-' * 60}")
        print(f"הטקסט נשמר גם בקובץ: {output_file}")
        print(f"אורך הטקסט: {len(text)} תווים")
    else:
        print("לא הצלחתי לחלץ טקסט מהקובץ.")
        print("ייתכן שהקובץ אינו מכיל טקסט קריא או שיש בעיה בזיהוי העברית.")

if __name__ == "__main__":
    main()
