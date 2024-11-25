import csv

input_csv = "valid_tickers.csv"

# Read the CSV and process the data
def convert_csv_to_format(file_path):
    formatted_output = []
    # Open the file with the correct encoding
    with open(file_path, mode="r", encoding="utf-8") as csv_file:
        reader = csv.DictReader(csv_file)
        for row in reader:
            formatted_output.append(f'{{ ticker: "{row["ticker"]}", company_name: "{row["company_name"]}" }}')

    # Join all entries with a comma and newline for readability
    result = ",\n    ".join(formatted_output)
    # Wrap the output in brackets for the requested format
    return f"[{result}]"

# Call the function and get the formatted output
output = convert_csv_to_format(input_csv)

# Print the result
print(output)

# Optionally save to a file
with open("output.txt", "w", encoding="utf-8") as output_file:
    output_file.write(output)
